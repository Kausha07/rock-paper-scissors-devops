# 🚀 Quick Start Guide

## Prerequisites (5 minutes)
1. **Install Docker Desktop**: Download from [docker.com](https://docker.com)
2. **Verify installation**:
   ```bash
   docker --version
   docker-compose --version
   ```

## Setup (2 minutes)
```bash
cd rock-paper-scissors-devops
./scripts/setup.sh
```

## Access Applications (1 minute)
- 🎮 **Game**: http://localhost:3000
- 📊 **Grafana**: http://localhost:3001 (admin/admin)
- 📈 **Prometheus**: http://localhost:9090
- 🔧 **Jenkins**: http://localhost:8080

## Verify Setup
```bash
./scripts/verify.sh
```

## Push to GitHub (2 minutes)
```bash
git remote add origin https://github.com/YOUR_USERNAME/rock-paper-scissors-devops.git
git push -u origin main
```

## What's Included
✅ **Complete CI/CD Pipeline** with Jenkins  
✅ **Real-time Monitoring** with Prometheus + Grafana  
✅ **Interactive Game** with React frontend  
✅ **REST API** with Node.js backend  
✅ **PostgreSQL Database** for game stats  
✅ **Docker Containerization** for all services  
✅ **Kubernetes Ready** deployment configs  
✅ **Security Scanning** with Trivy  
✅ **Automated Testing** in pipeline  

## Architecture
```
React App (3000) → Node.js API (8000) → PostgreSQL (5432)
                        ↓
                  Prometheus (9090) → Grafana (3001)
                        ↓
                   Jenkins (8080)
```

## Next Steps
1. **Play the game** and watch metrics in Grafana
2. **Customize dashboards** in Grafana
3. **Set up Jenkins pipeline** for your repository
4. **Deploy to Kubernetes** using `kubectl apply -f k8s/`
5. **Add more features** to the game

## Troubleshooting
- **Services not starting?** Run `docker-compose logs [service-name]`
- **Port conflicts?** Stop other services or change ports in docker-compose.yml
- **Permission issues?** Ensure Docker has proper permissions

## Cost
- **Local Development**: FREE
- **Cloud Deployment**: ~$20-50/month

**Happy DevOps! 🎮**

<!-- Test change for Jenkins automation -->