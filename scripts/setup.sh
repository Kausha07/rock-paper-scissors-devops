#!/bin/bash

set -e

echo "🚀 Setting up Rock Paper Scissors DevOps Project"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    log_info "Prerequisites check passed!"
}

# Start services
start_services() {
    log_info "Starting all services with Docker Compose..."
    
    docker-compose down --remove-orphans
    docker-compose build
    docker-compose up -d
    
    log_info "Services started successfully!"
}

# Wait for services
wait_for_services() {
    log_info "Waiting for services to be ready..."
    
    # Wait for backend
    for i in {1..30}; do
        if curl -f http://localhost:8000/health &> /dev/null; then
            log_info "Backend is ready!"
            break
        fi
        sleep 2
    done
    
    # Wait for frontend
    for i in {1..30}; do
        if curl -f http://localhost:3000/health &> /dev/null; then
            log_info "Frontend is ready!"
            break
        fi
        sleep 2
    done
    
    # Wait for Prometheus
    for i in {1..30}; do
        if curl -f http://localhost:9090/-/ready &> /dev/null; then
            log_info "Prometheus is ready!"
            break
        fi
        sleep 2
    done
    
    # Wait for Grafana
    for i in {1..30}; do
        if curl -f http://localhost:3001/api/health &> /dev/null; then
            log_info "Grafana is ready!"
            break
        fi
        sleep 2
    done
}

# Display endpoints
show_endpoints() {
    echo ""
    log_info "🎉 Setup completed successfully!"
    echo ""
    echo "📱 Application Endpoints:"
    echo "   Game: http://localhost:3000"
    echo "   API: http://localhost:8000/api"
    echo ""
    echo "📊 Monitoring:"
    echo "   Grafana: http://localhost:3001 (admin/admin)"
    echo "   Prometheus: http://localhost:9090"
    echo ""
    echo "🔧 CI/CD:"
    echo "   Jenkins: http://localhost:8080 (admin/admin123)"
    echo ""
    echo "🎮 Try playing the game and check the metrics in Grafana!"
    echo ""
}

# Main execution
main() {
    check_prerequisites
    start_services
    wait_for_services
    show_endpoints
}

# Handle script interruption
trap 'log_error "Setup interrupted"; exit 1' INT TERM

# Run main function
main