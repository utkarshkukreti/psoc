DIR = purescript-halogen-realworld

default: $(DIR)
	cd $(DIR) && pulp build -- --codegen corefn,js
	cargo run --release -- --input $(DIR)/output --entry Main.main > main.js
	rollup -c --output.format iife --output.name RWH main.js > main.min.js
	@echo "Minified size: $$(cat main.min.js | wc -c) bytes"
	@echo " Gzipped size: $$(cat main.min.js | gzip | wc -c) bytes"

$(DIR):
	rm -rf $(DIR)
	git clone https://github.com/thomashoneyman/purescript-halogen-realworld
	cd $(DIR) && git checkout d213795014a69af99dcb90cdbc8628d3f760c171 && yarn install && bower install

.PHONY: default
