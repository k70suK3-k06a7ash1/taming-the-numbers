push:
	git add . && git commit -m 'chore' && git push origin

deploy:
	cd app && bun run build && bun run deploy

set-pre-push:
	bash setup-prepush.sh