{ name =
    "map-benchmark"
, dependencies =
    [ "console", "effect", "ordered-collections", "prelude", "psci-support" ]
, packages =
    ./packages.dhall
, sources =
    [ "src/**/*.purs" ]
}
