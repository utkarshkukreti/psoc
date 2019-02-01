default:
	cd t && pulp build -- --codegen corefn,js
	cargo run -- --input t --entry Main.main
