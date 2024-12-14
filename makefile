deploy:
	cd taming-the-numbers && bun run build && bun run deploy

set-pre-push:
	bash setup-prepush.sh