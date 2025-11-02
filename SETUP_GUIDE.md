# 🚀 Step-by-Step Setup Guide

## What You Need to Do

### Step 1: Prerequisites (5 minutes)
```bash
# Install Docker Desktop
# Download from: https://www.docker.com/products/docker-desktop

# Verify installation
docker --version
docker-compose --version
```

### Step 2: Clone and Setup (2 minutes)
```bash
# Clone the repository
git clone https://github.com/your-username/rock-paper-scissors-devops.git
cd rock-paper-scissors-devops

# Run automated setup
./scripts/setup.sh
```

### Step 3: Access Applications (1 minute)
- **Game**: http://localhost:3000
- **Grafana**: http://localhost:3001 (admin/admin)
- **Prometheus**: http://localhost:9090
- **Jenkins**: http://localhost:8080

### Step 4: Play and Monitor (5 minutes)
1. Play the Rock Paper Scissors game
2. Check metrics in Grafana
3. View logs in Jenkins
4. Monitor system performance

## 📊 What You'll See

### Game Application
- Interactive Rock Paper Scissors game
- Real-time statistics
- Win/loss tracking

### Monitoring Dashboard
- Game metrics (games played, choices made)
- System metrics (CPU, memory)
- Response times and error rates

### CI/CD Pipeline
- Automated testing
- Docker image building
- Deployment automation

## 🎯 Learning Outcomes

After completing this project, you'll understand:
- **Jenkins CI/CD**: Pipeline creation and automation
- **Prometheus**: Metrics collection and monitoring
- **Grafana**: Dashboard creation and visualization
- **Docker**: Containerization and orchestration
- **DevOps**: Complete pipeline from code to production

## 🔧 Customization

### Add New Metrics
```javascript
// In backend/server.js
const newMetric = new client.Counter({
  name: 'custom_metric_total',
  help: 'Description of custom metric'
});
```

### Create New Dashboard
1. Open Grafana (http://localhost:3001)
2. Create new dashboard
3. Add panels with Prometheus queries
4. Save and share

### Modify CI/CD Pipeline
1. Edit `jenkins/Jenkinsfile`
2. Add new stages or modify existing ones
3. Commit changes to trigger pipeline

## 🚨 Troubleshooting

### Services Not Starting
```bash
# Check Docker status
docker ps

# View logs
docker-compose logs [service-name]

# Restart services
docker-compose restart
```

### Port Conflicts
```bash
# Check what's using ports
lsof -i :3000
lsof -i :8000
lsof -i :9090
lsof -i :3001

# Kill processes if needed
kill -9 [PID]
```

### Database Issues
```bash
# Reset database
docker-compose down -v
docker-compose up -d
```

## 🎉 Success Criteria

You've successfully completed the project when:
- ✅ Game loads and works at http://localhost:3000
- ✅ Grafana shows game metrics at http://localhost:3001
- ✅ Prometheus collects metrics at http://localhost:9090
- ✅ Jenkins pipeline runs successfully
- ✅ All services are healthy and monitored

## 📈 Next Steps

1. **Deploy to Cloud**: Use Kubernetes for production deployment
2. **Add More Games**: Extend with additional game types
3. **Advanced Monitoring**: Add alerting and notifications
4. **Security**: Implement authentication and authorization
5. **Performance**: Add caching and optimization

## 🆘 Need Help?

- Check the logs: `docker-compose logs`
- Restart services: `docker-compose restart`
- Reset everything: `docker-compose down -v && docker-compose up -d`
- Create GitHub issue for bugs

---

**Total Setup Time: ~10 minutes**
**Learning Time: ~2-3 hours**