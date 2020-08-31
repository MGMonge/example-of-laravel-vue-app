# My App Local Environment Setup Scripts

# HELP
# This will output the help for each task
.PHONY: help

help: ## This help.
	@sh docs/.motd
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# TASKS
start: ## Build and start the environment.
	docker-compose up -d --build
	@echo ""
	@echo ""
	@echo "Environment Ready"
	@echo ""
	@echo "API: http://localhost:8000"
	@echo "Website: http://localhost:8080"
stop: ## Stop/pause the environment.
	docker-compose stop
refresh: ## Refresh the environment without loosing images nor volumes.
	docker-compose down
	docker-compose up -d --build
destroy: ## Destroy and clean the environment.
	docker-compose down --rmi all --volumes --remove-orphans
build: ## Build technical test implementation.
	docker-compose exec api composer install
	docker-compose exec api php artisan migrate:fresh
	docker-compose exec api php artisan db:seed
	docker-compose exec website npm run production
	@echo ""
	@echo ""
	@echo "Application Ready 🎉"

test: ## Run the tests
	docker-compose exec api ./vendor/bin/phpunit tests
	docker-compose exec website npm run test
