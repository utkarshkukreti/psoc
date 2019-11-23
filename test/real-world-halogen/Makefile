DIR = purescript-halogen-realworld

default: $(DIR)
	cd $(DIR) && spago build -u "--codegen corefn,js"
	cargo build --release
	time cargo run --release -- --input $(DIR)/output --entry Main.main > main.js
	rollup -c --output.format iife --output.name RWH main.js > main.min.js
	@echo "Minified size: $$(cat main.min.js | wc -c) bytes"
	@echo " Gzipped size: $$(cat main.min.js | gzip | wc -c) bytes"

$(DIR):
	rm -rf $(DIR)
	git clone https://github.com/thomashoneyman/purescript-halogen-realworld
	cd $(DIR) && git checkout 4581af1e04044a129d1c7fea15e99d75ecfbe3e2 && yarn install && yarn build

.PHONY: default
