default:
	cd t && pulp build -- --codegen corefn,js
	cargo run -- --input t/output --entry Main.main | prettier --parser babylon /dev/stdin | tee t.js
	/bin/bash -c "diff <(cargo run -- --input t/output --entry Main.main --es6 | prettier --parser babylon /dev/stdin) t.js | tee t.es6.diff"
	cargo run -- --input t/output --entry Main.main | node | tee t.stdout
