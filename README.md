# 🎮 Rock Paper Scissors - DevOps Project

A simple Rock Paper Scissors game with complete DevOps pipeline featuring Jenkins CI/CD, Prometheus monitoring, and Grafana dashboards.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │────│   Node.js API   │────│   PostgreSQL    │
│   Port: 3000    │    │   Port: 8000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │    Jenkins      │
                    │   CI/CD Pipeline │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Kubernetes    │
                    │    Cluster      │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Prometheus +   │
                    │    Grafana      │
                    └─────────────────┘
```

## 🎯 Features

- **Game**: Rock Paper Scissors with score tracking
- **CI/CD**: Jenkins pipeline with automated testing and deployment
- **Monitoring**: Prometheus metrics collection
- **Dashboards**: Grafana visualization
- **Containerization**: Docker containers
- **Orchestration**: Kubernetes deployment
- **Database**: PostgreSQL for game statistics

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- kubectl (for Kubernetes deployment)
- Node.js 18+ (for local development)

### Local Development
```bash
# Clone repository
git clone https://github.com/your-username/rock-paper-scissors-devops.git
cd rock-paper-scissors-devops

# Start with Docker Compose
docker-compose up -d

# Access applications
# Game: http://localhost:3000
# Jenkins: http://localhost:8080 (admin/admin123)
# Grafana: http://localhost:3001 (admin/admin)
# Prometheus: http://localhost:9090
```

### Production Deployment
```bash
# Deploy to Kubernetes
kubectl apply -f k8s/

# Access via LoadBalancer or Ingress
kubectl get services
```

## 📊 Monitoring

### Metrics Collected
- **Game Metrics**: Games played, wins/losses, response times
- **System Metrics**: CPU, memory, disk usage
- **Application Metrics**: HTTP requests, error rates

### Grafana Dashboards
- Game Statistics Dashboard
- System Performance Dashboard
- Jenkins Pipeline Dashboard

## 🔧 CI/CD Pipeline

### Jenkins Pipeline Stages
1. **Checkout**: Pull code from Git
2. **Test**: Run unit tests
3. **Build**: Create Docker images
4. **Security Scan**: Vulnerability scanning
5. **Deploy**: Deploy to Kubernetes
6. **Monitor**: Health checks

## 🎮 Game Rules

- Rock beats Scissors
- Scissors beats Paper  
- Paper beats Rock
- Same choice = Tie

## 📈 Tech Stack

- **Frontend**: React.js with Material-UI
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Monitoring**: Prometheus + Grafana
- **CI/CD**: Jenkins
- **Containerization**: Docker
- **Orchestration**: Kubernetes

## 🛠️ Development

### Running Tests
```bash
# Backend tests
cd app/backend
npm test

# Frontend tests
cd app/frontend
npm test
```

### Building Images
```bash
# Build all images
docker-compose build

# Build specific service
docker build -t rps-backend app/backend/
```

## 📝 API Endpoints

- `GET /api/health` - Health check
- `POST /api/game/play` - Play a game
- `GET /api/game/stats` - Get game statistics
- `GET /api/metrics` - Prometheus metrics

## 🔒 Security

- Container security scanning
- Secrets management
- Network policies
- RBAC configuration

## 📊 Cost Estimation

- **Local Development**: Free
- **Cloud Deployment**: ~$50-100/month
  - Kubernetes cluster: $30-50
  - Load balancer: $15-20
  - Storage: $5-10
  - Monitoring: $5-15

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Run tests
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- Create GitHub issues for bugs
- Check documentation in `/docs`
- Contact: your-email@example.com

---

**Happy Gaming! 🎮**