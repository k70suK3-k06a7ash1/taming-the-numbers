deploy:
	cd taming-the-numbers && bun run build && bun run deploy

pre-push:
	bash setup-prepush.sh