deploy:
	cd app && bun run build && bun run deploy

set-pre-push:
	bash setup-prepush.sh