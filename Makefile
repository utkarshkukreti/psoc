default:
	cd t && pulp build -- --codegen corefn,js
	cargo run -- --input t/output --entry Main.main | prettier --parser babylon /dev/stdin | tee t.js
	cargo run -- --input t/output --entry Main.main | node | tee t.stdout
