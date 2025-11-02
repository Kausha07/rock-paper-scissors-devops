const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const winston = require('winston');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 8000;

// Prometheus metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const gamesPlayed = new client.Counter({
  name: 'rps_games_played_total',
  help: 'Total number of games played',
  labelNames: ['result']
});

const gameChoices = new client.Counter({
  name: 'rps_choices_total',
  help: 'Total choices made',
  labelNames: ['choice']
});

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

// Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'game.log' })
  ]
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Metrics middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration);
  });
  next();
});

// Game logic
const choices = ['rock', 'paper', 'scissors'];
const gameStats = {
  totalGames: 0,
  playerWins: 0,
  computerWins: 0,
  ties: 0
};

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return 'tie';
  
  const winConditions = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };
  
  return winConditions[playerChoice] === computerChoice ? 'player' : 'computer';
}

// Routes
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'rps-backend',
    version: '1.0.0'
  });
});

app.post('/api/game/play', (req, res) => {
  const { playerChoice } = req.body;
  
  if (!choices.includes(playerChoice)) {
    return res.status(400).json({
      error: 'Invalid choice. Must be rock, paper, or scissors'
    });
  }
  
  const computerChoice = getComputerChoice();
  const result = determineWinner(playerChoice, computerChoice);
  
  // Update stats
  gameStats.totalGames++;
  if (result === 'player') gameStats.playerWins++;
  else if (result === 'computer') gameStats.computerWins++;
  else gameStats.ties++;
  
  // Update metrics
  gamesPlayed.labels(result).inc();
  gameChoices.labels(playerChoice).inc();
  gameChoices.labels(computerChoice).inc();
  
  logger.info('Game played', {
    playerChoice,
    computerChoice,
    result,
    totalGames: gameStats.totalGames
  });
  
  res.json({
    playerChoice,
    computerChoice,
    result,
    message: result === 'tie' ? "It's a tie!" : 
             result === 'player' ? 'You win!' : 'Computer wins!'
  });
});

app.get('/api/game/stats', (req, res) => {
  res.json({
    ...gameStats,
    winRate: gameStats.totalGames > 0 ? 
      (gameStats.playerWins / gameStats.totalGames * 100).toFixed(2) : 0
  });
});

app.get('/api/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Error handling
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Rock Paper Scissors backend running on port ${PORT}`);
});

module.exports = app;