## FAI

```cs
using System;

// we do not have to write System.Console
// název nesmí začít číslicí
// int, byte, decimal, float, string
// preferovat double před floatem, Bool
// byte,
// decimal = 12n (128 bitů)
// Operátor module 3 % 2 = 1 (2 zbytek 1)
// x++ / ++x




/*

Obvod a obsah:
* čtverce,
* obdélníku,
* kruhu a
* trojúhelníku zadaného délkami stran, obsah spočítáme pomocí Heronova vzorce.
* Výpočet BMI indexu s numerickým výstupem (bmi = 25.0)
** Výpočet splátky úroku


  */

namespace FAI
{

    // třída
    struct Counter
    {
        // soukromá proměnná, pokud ji chceme přečíst, musíme zavolat veřejnou metodu
        private string name;

        // konstruktor
        public Counter(string name)
        {
            this.name = name;
        }

        public string getName() {
            return this.name;
        }

        public static int rectArea(int a, int b) {
            return a * b;
        }

        public static int complex(int a, int b) {
            // přetypování
            // kvůli funkci Math.pow je třeba přetypovat na int

            int res = 0;

            // je "a" i "b" větší než 0 ?
            if ((a > 0) && (b > 0)){ 
                res = (int)Math.Pow(a, 3.0) + (int)Math.Sqrt(a + b);
            }
            
            return res;
        }


        // Cyklus
        public static int average(int[] arr){

            var sum = 0;
            for (var i = 0; i < arr.Length; i++) {
                sum += arr[i];
            }

            if (arr.Length > 0) {
                return sum / arr.Length;
            } else {
                return 0;
            }

         }



    }





    class MainClass
    {
        public static void Main(string[] args)
        {

        Counter c = new Counter("Filip");
        Console.WriteLine($"Rectangle has name {c.getName()}");
        Console.WriteLine($"Area is {Counter.rectArea(2, 3)}");
        Console.WriteLine($"More complex formula result {Counter.complex(2, 3)} ");

        var field = new int[] { 1, 2, 3 };
        Console.WriteLine($"Array average of [1, 2, 3] {Counter.average(field)} ");


            Console.WriteLine("Stiskněte prosím klávesu.");
            Console.ReadKey();


            // While cyklus. Zadejte F
            while (Console.ReadKey().KeyChar != 'F') {
                Console.WriteLine("Zadejte F");
           }


            Console.WriteLine("Stiskněte prosím klávesu.");
            Console.ReadKey();

            // Čísla 1 až 100

            int i = 0;
            while (i <= 100) {   
                Console.WriteLine(i);
                i += 1;
            }


            Console.WriteLine("Stiskněte prosím klávesu.");
            Console.ReadKey();


            // čísla po násobku 10

            for (var f = 0; f < 100; f = f + 10) {
                Console.WriteLine("Number is " + f);
            }


            Console.WriteLine("Stiskněte prosím klávesu.");
            Console.ReadKey();

            // Sudá čísla od 0 do 100 dělitelná 2

            for (var n = 0; n < 100; n++) {
                if (n % 2 == 0) {
                    Console.WriteLine("Od number is " + n);
                }
            }


            Console.WriteLine("Stiskněte prosím klávesu.");
            Console.ReadKey();



            // ref VS out

            // Pokud použijeme OUT, nemusíme uvést počáteční hodnotu
            // OUT zanmená, že hodnota bude načtena uvnitř funkce

            int s = 0;

            void change(ref int x) {
                x = 20;
            }

            change(ref s);

            Console.WriteLine(s); // s is now 20


            // REF (změní nám počáteční hodnotu

            int q = 0;

            int mutate(ref int g) {
                q = 2;
                return q;
            }

            mutate(ref q);


            Console.WriteLine("------");
            Console.WriteLine(q); // 2, ne 0
            Console.ReadKey();


            





            // ar. výrazy



            /*
            // S, o Square
            double a = 65;
            double sqArea = Math.Pow(a, 2);
            Console.WriteLine($"Area SQ {sqArea}");
            double o = 4 * a;
            Console.WriteLine($"Obvod SQ {o}");


            // S, o Rectangle
            double ar = 65;
            double b = 23;

            double rArea = ar * b;
            Console.WriteLine($"Area RECT {rArea}");

            double or = 2 * (ar + b);
            Console.WriteLine($"Obvod RECT {or}");

            // Circle S, o
            double r = 34;
            double area = Math.PI * Math.Pow(r, 2);
            Console.WriteLine($"Area {area}");

            double co = 2 * Math.PI * r;
            Console.WriteLine($"Obvod {co}");

            double sq = Math.Sqrt(65.0);
            Console.WriteLine($"SQ {sq}");

            // Triangle
            double ta = 65;
            double tb = 65;
            double tc = 65;

            double to = ta + tb + tc;
            double h = to / 2;
            double res = Math.Sqrt(h * (h - ta) * (h - tb) * (h - tc));

            Console.WriteLine($"Area T {res}");
            Console.WriteLine($"Obvod T {to}");


            // BMI
            double w = 23;
            double ha = 1.2;
            double bmi = w / ha * ha;
            Console.WriteLine($"BMI BI {bmi}");
            Console.WriteLine("BMI IS " + bmi);

            // Úrok
            double i = 0.20; // úroková sazba
            double n = 10; // počet splátek
            double D = 21; // počáteční hodnota dluhu
            double v = 1 / (1 + i);
            double payment = (i * D) / (1 - Math.Pow(v, n));
            Console.WriteLine(payment);
            Console.WriteLine();
            */



        }
    }
}

```
