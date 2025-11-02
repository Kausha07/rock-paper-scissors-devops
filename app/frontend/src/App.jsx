import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
  Alert,
  Chip
} from '@mui/material';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const choices = [
  { name: 'rock', emoji: '🪨', color: '#8D6E63' },
  { name: 'paper', emoji: '📄', color: '#FFA726' },
  { name: 'scissors', emoji: '✂️', color: '#42A5F5' }
];

function App() {
  const [gameResult, setGameResult] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE}/game/stats`);
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const playGame = async (playerChoice) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_BASE}/game/play`, {
        playerChoice
      });
      
      setGameResult(response.data);
      await fetchStats();
    } catch (err) {
      setError('Failed to play game. Please try again.');
      console.error('Game error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getResultColor = (result) => {
    switch (result) {
      case 'player': return 'success';
      case 'computer': return 'error';
      case 'tie': return 'warning';
      default: return 'info';
    }
  };

  const getChoiceEmoji = (choice) => {
    const found = choices.find(c => c.name === choice);
    return found ? found.emoji : '❓';
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        🎮 Rock Paper Scissors DevOps
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Chip label="🚀 CI/CD Pipeline Active" color="success" variant="outlined" />
        <Chip label="📊 Real-time Monitoring" color="primary" variant="outlined" sx={{ ml: 1 }} />
      </Box>
      
      <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
        Enterprise DevOps Game with Docker, Jenkins & Grafana!
      </Typography>

      {/* Game Stats */}
      {stats && (
        <Card sx={{ mb: 4, bgcolor: 'background.paper' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📊 Game Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Chip label={`Games: ${stats.totalGames}`} color="primary" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Chip label={`Wins: ${stats.playerWins}`} color="success" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Chip label={`Losses: ${stats.computerWins}`} color="error" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Chip label={`Ties: ${stats.ties}`} color="warning" />
              </Grid>
            </Grid>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Win Rate: {stats.winRate}%
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Game Result */}
      {gameResult && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Alert severity={getResultColor(gameResult.result)} sx={{ mb: 2 }}>
              {gameResult.message}
            </Alert>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={5} textAlign="center">
                <Typography variant="h4">
                  {getChoiceEmoji(gameResult.playerChoice)}
                </Typography>
                <Typography variant="body1">You</Typography>
                <Typography variant="caption" color="text.secondary">
                  {gameResult.playerChoice}
                </Typography>
              </Grid>
              <Grid item xs={2} textAlign="center">
                <Typography variant="h6">VS</Typography>
              </Grid>
              <Grid item xs={5} textAlign="center">
                <Typography variant="h4">
                  {getChoiceEmoji(gameResult.computerChoice)}
                </Typography>
                <Typography variant="body1">Computer</Typography>
                <Typography variant="caption" color="text.secondary">
                  {gameResult.computerChoice}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Game Choices */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom align="center">
            Make Your Choice
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {choices.map((choice) => (
              <Grid item key={choice.name}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => playGame(choice.name)}
                  disabled={loading}
                  sx={{
                    minWidth: 120,
                    minHeight: 120,
                    borderRadius: 2,
                    bgcolor: choice.color,
                    '&:hover': {
                      bgcolor: choice.color,
                      opacity: 0.8
                    }
                  }}
                >
                  <Box textAlign="center">
                    <Typography variant="h2" component="div">
                      {choice.emoji}
                    </Typography>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                      {choice.name}
                    </Typography>
                  </Box>
                </Button>
              </Grid>
            ))}
          </Grid>
          
          {loading && (
            <Typography align="center" sx={{ mt: 2 }}>
              Playing...
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Game Rules */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📜 Game Rules
          </Typography>
          <Typography variant="body2" component="div">
            • Rock beats Scissors<br/>
            • Scissors beats Paper<br/>
            • Paper beats Rock<br/>
            • Same choice = Tie
          </Typography>
        </CardContent>
      </Card>

      {/* DevOps Tools */}
      <Card sx={{ mt: 4, bgcolor: 'primary.main', color: 'white' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🔧 DevOps Monitoring Dashboard
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ color: 'white', borderColor: 'white' }}
                onClick={() => window.open('http://localhost:3001', '_blank')}
              >
                📊 Grafana Dashboard
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ color: 'white', borderColor: 'white' }}
                onClick={() => window.open('http://localhost:9090', '_blank')}
              >
                📈 Prometheus Metrics
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ color: 'white', borderColor: 'white' }}
                onClick={() => window.open('http://localhost:8081', '_blank')}
              >
                🔧 Jenkins CI/CD
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;