default:
	docker-compose up

build:
	docker-compose build

stop:
	docker-compose stop

kill: stop
	docker-compose rm

compile:
	yarn run build

prod_build: compile
	docker-compose -f docker-compose.prod.yml build

prod_run:
	docker-compose -f docker-compose.prod.yml up
