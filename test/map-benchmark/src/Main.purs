module Main where

import Prelude

import Data.Array ((..))
import Data.Foldable (foldl)
import Data.Map as Map
import Effect (Effect)
import Effect.Console (log)

main :: Effect Unit
main = log $ show $ go 50
  where
    array = 1 .. 100000
    go 0 = 0
    go n = do
      let map = foldl (\acc x -> Map.insert x x acc) Map.empty array
      Map.size map + go (n - 1)
