default:
	cd t && pulp build -- --codegen corefn,js
	cargo run -- --input t --entry Main.main | prettier --parser babylon /dev/stdin | tee t.js
