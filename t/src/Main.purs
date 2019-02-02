module Main where

array = [1, 2, 3]
boolean = true
char = 'π'
int = 42
number = 1.23
object = { array, boolean, char, int, number, string, one: numbers.one }
string = "πr²"

numbers = { one: 1 }

tuple a b = { a, b }
infixr 6 tuple as /\

data D0
data D1 = D1_1
data D2 = D2_1 | D2_2
data D3 = D3_1 Int
data D4 = D4_1 Int Int
data D5 = D5_1 Int | D5_2
data D6 = D6_1 Int | D6_2 | D6_3
data D7 = D7_1 Int | D7_2 Int
newtype N = N Int

datas = D1_1 /\ D2_1 /\ D2_2 /\ D3_1 /\ D4_1 /\ D5_1 /\ D5_2 /\ D6_1 /\ D6_2 /\ D6_3 /\ D7_1 /\ D7_2 /\ N

fourTuple x y =
  let
    a = x /\ y
    d =
      let
        b = a /\ a
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
  [0, x, 2] -> x
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
  {c: 'c', d: {e: {f: 4.0}}} -> ".c is c and .d.e.f is 4.0"
  _ -> "other"

caseNamed = case _ of
  {a: b @ [0]} -> let bb = b in bb
  {b: {c: {d: b @ [1]}}} -> let bb = b in bb
  {c: [[[b @ [1, 2, 3]]]]} -> let bb = b in bb
  _ -> []

caseString = case _ of
  "hi" -> "hi"
  _ -> "other"

cases = caseBoolean true /\ caseChar 'π' /\ caseInt 43 /\ caseNumber 1.234 /\ caseString "hi" /\ caseArrays /\ caseObject /\ caseNamed

foreign import data Unit :: Type

foreign import data Effect :: Type -> Type

foreign import log :: forall a. a -> Effect Unit

main :: Effect Unit
main = log (object /\ tuple /\ datas /\ fourTuple /\ m 0 0 0 /\ m 1 1 1 /\ m 0 1 0 /\ m 3 3 3 /\ cases)
