module Main where

import A as A

array = A.array
boolean = true
char = 'π'
int = 42
number = 1.23
object = { array, boolean, char, int, number, string', one: numbers.one }
string' = "πr²"

numbers = { one: 1 }

tuple a b' = { a, b: b' }
infixr 6 tuple as /\

data D0
data D1 = D1_1
data D2 = D2_1 | D2_2
data D3 = D3_1 Int
data D4 = D4_1 Int Int
data D5 = D5_1 Int | D5_2
data D6 = D6_1 Int | D6_2 | D6_3
data D7 = D7_1 Int | D7_2' Int
newtype N = N Int

datas = D1_1 /\ D2_1 /\ D2_2 /\ D3_1 /\ D4_1 /\ D5_1 /\ D5_2 /\ D6_1 /\ D6_2 /\ D6_3 /\ D7_1 /\ D7_2' /\ N

caseData1 = case _ of
  D1_1 -> 1

caseData2 = case _ of
  D2_1 -> 1
  D2_2 -> 2

caseData3 = case _ of
  D3_1 x -> x

caseData4 = case _ of
  D4_1 x y -> x /\ y

caseData5 = case _ of
  D5_1 x -> x
  D5_2 -> 2

caseData6 = case _ of
  D6_1 x -> x
  D6_2 -> 2
  D6_3 -> 3

caseData7 = case _ of
  D7_1 x -> x
  D7_2' x -> x

caseNewtype = case _ of
  N x -> x

caseDatas = caseData1 /\ caseData2 /\ caseData3 /\ caseData4 /\ caseData5 /\ caseData6 /\ caseData7 /\ caseNewtype

fourTuple x y =
  let
    a' = x /\ y
    d =
      let
        b = a' /\ a'
        c = b /\ b
      in
        c /\ c
  in
    d /\ d

f x = x
m a b c = case f a, b, f c of
  0, 0, 0 -> "zeros"
  1, 1, 1 -> "ones"
  _, _, _ -> "others"

caseArray = case _ of
  [] -> 0
  [0, x', 2] -> x'
  [_, _, z] -> z
  _ -> 9

caseArrays = caseArray [] /\ caseArray [0, 1, 2] /\ caseArray [7, 6, 5] /\ caseArray [2]

caseBoolean = case _ of
  true -> "true"
  _ -> "other"

caseChar = case _ of
  'π' -> "pi"
  _ -> "other"

caseInt = case _ of
  42 -> "42"
  _ -> "other"

caseNumber = case _ of
  1.23 -> "1.23"
  _ -> "other"

caseObject = case _ of
  {a: 1} -> ".a is 1"
  {b: "b"} -> ".b is b"
  {c: 'c', d': {e: {f: 4.0}}} -> ".c is c and .d'.e.f is 4.0"
  _ -> "other"

caseNamed = case _ of
  {a: b @ [0]} -> let bb = b in bb
  {b: {c: {d: b' @ [1]}}} -> let bb = b' in bb
  {c: [[[b @ [1, 2, 3]]]]} -> let bb = b in bb
  _ -> []

caseString = case _ of
  "hi" -> "hi"
  _ -> "other"

cases = caseBoolean true /\ caseChar 'π' /\ caseInt 43 /\ caseNumber 1.234 /\ caseString "hi" /\ caseArrays /\ caseObject /\ caseNamed /\ caseDatas

class Show a where
  show :: a -> String

instance showInt :: Show Int where
  show _ = "Int"

instance showNumber :: Show Number where
  show _ = "Number"

instance showArray :: (Show a) => Show (Array a) where
  show _ = "Array"

typeclass = show 1 /\ show 1.23 /\ show [1, 2] /\ show [1.2, 3.4]

foreign import data Unit :: Type

foreign import data Effect :: Type -> Type

foreign import log :: forall a. a -> Effect Unit

forever x = forever x

tuplizeA o = o { a = o.a /\ o.a }

newtype Hello = Hi Int

matchHello = case _ of
  Hi hi -> hi

isOne = case _ of
  1 -> true
  _ -> false

guardedMatch = case _ of
  [x, y, z] | isOne x, isOne y -> z
  [x, y, z] | isOne y, isOne z -> x
  [x, y, z] | isOne x, isOne z -> y
  _ -> 0

guardedMatches = [
  guardedMatch [],
  guardedMatch [1, 1, 1],
  guardedMatch [2, 1, 1],
  guardedMatch [1, 3, 1]
]

void' = let void = "void" in void

main :: Effect Unit
main = log (object /\ tuple /\ datas /\ fourTuple /\ m 0 0 0 /\ m 1 1 1 /\ m 0 1 0 /\ m 3 3 3 /\ cases /\ forever /\ typeclass /\ tuplizeA /\ matchHello /\ guardedMatches /\ void')
