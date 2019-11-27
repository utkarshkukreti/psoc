default:
	pulp build -- --codegen corefn,js
	cargo run --release -- --input output --entry Main.main | prettier --parser babel > main.js
	@echo ------------------------------ PURS ------------------------------
	@/bin/bash -c "time node -e 'require(\"./output/Main/index.js\").main()'"
	@echo ------------------------------ PSOC ------------------------------
	@/bin/bash -c "time node main.js"
