#!/bin/bash

echo "🔍 Verifying Rock Paper Scissors DevOps Setup"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

check_service() {
    local service=$1
    local url=$2
    local expected_status=${3:-200}
    
    echo -n "Checking $service... "
    
    if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "$expected_status"; then
        echo -e "${GREEN}✅ OK${NC}"
        return 0
    else
        echo -e "${RED}❌ FAILED${NC}"
        return 1
    fi
}

echo ""
echo "🎮 Game Application:"
check_service "Frontend" "http://localhost:3000/health"
check_service "Backend API" "http://localhost:8000/health"
check_service "Game Stats" "http://localhost:8000/api/game/stats"

echo ""
echo "📊 Monitoring:"
check_service "Prometheus" "http://localhost:9090/-/ready"
check_service "Grafana" "http://localhost:3001/api/health"

echo ""
echo "🔧 CI/CD:"
check_service "Jenkins" "http://localhost:8080/login" 403

echo ""
echo "🎯 Quick Test - Playing a game:"
GAME_RESULT=$(curl -s -X POST http://localhost:8000/api/game/play \
    -H "Content-Type: application/json" \
    -d '{"playerChoice":"rock"}')

if echo "$GAME_RESULT" | grep -q "result"; then
    echo -e "${GREEN}✅ Game API working${NC}"
    echo "Result: $GAME_RESULT"
else
    echo -e "${RED}❌ Game API failed${NC}"
fi

echo ""
echo "📈 Metrics Test:"
METRICS=$(curl -s http://localhost:8000/api/metrics)
if echo "$METRICS" | grep -q "rps_games_played_total"; then
    echo -e "${GREEN}✅ Metrics collection working${NC}"
else
    echo -e "${RED}❌ Metrics collection failed${NC}"
fi

echo ""
echo "🎉 Setup verification complete!"
echo ""
echo "📱 Access your applications:"
echo "   Game: http://localhost:3000"
echo "   Grafana: http://localhost:3001 (admin/admin)"
echo "   Prometheus: http://localhost:9090"
echo "   Jenkins: http://localhost:8080"