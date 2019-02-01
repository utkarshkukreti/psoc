use structopt::StructOpt;

mod compile;

#[derive(StructOpt, Debug)]
#[structopt(name = "psoc")]
pub struct Opt {
    /// Input Path
    #[structopt(short = "i", long = "input")]
    input: String,
    /// Entry Point, e.g. "Main.main"
    #[structopt(short = "e", long = "entry")]
    entry: String,
}

fn main() {
    let opt = Opt::from_args();
    let modules = glob::glob(&format!("{}/*/corefn.json", opt.input))
        .unwrap()
        .map(|path| std::fs::read_to_string(path.unwrap()).unwrap())
        .map(|string| purescript_corefn::from_str(&string).unwrap())
        .collect::<Vec<_>>();
    println!("{}", compile::compile(&modules, &opt));
}
