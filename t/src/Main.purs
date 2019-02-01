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

main = object /\ tuple /\ datas
