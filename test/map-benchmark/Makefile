default: run

compile:
	spago build -u "--codegen corefn,js"
	cargo run --release -- --input output --entry Main.main | prettier --parser babel > main.js

run: compile
	@echo ------------------------------ PURS ------------------------------
	@/bin/bash -c "time node -e 'require(\"./output/Main/index.js\").main()'"
	@echo ------------------------------ PSOC ------------------------------
	@/bin/bash -c "time node main.js"
