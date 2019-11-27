default:
	cd t && pulp build -- --codegen corefn,js
	cargo run -- --input t/output --entry Main.main | prettier --parser babel /dev/stdin | tee t.js
	cd test/map-benchmark && make compile
	/bin/bash -c "diff <(cargo run -- --input t/output --entry Main.main --es6 | prettier --parser babel /dev/stdin) t.js | tee t.es6.diff"
	cargo run -- --input t/output --entry Main.main | node | tee t.stdout

rwh:
	cd test/real-world-halogen && make

map-benchmark:
	cd test/map-benchmark && make
