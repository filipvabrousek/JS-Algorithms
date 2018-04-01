
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace avga
{
    class Programa
    {
        static void Main(string[] args)
        {

            /*
            double sum = 0, avg = 0;
            int[] arr = new int[6];
            for (int i = 0; i < arr.Length; i++) {
                arr[i] = i;
                sum += arr[i];
            }
            sum = sum - arr.Min() - arr.Max();
            avg = sum / 4;
            Console.WriteLine(avg);
            Console.ReadKey();
            */

            int[] arr = new int[6];
            int min = 0, max = 0;
            int smin = 0; int smax = 0;
            Console.WriteLine("Zadejte délku pole.");
            int maxLen = int.Parse(Console.ReadLine());

            while (maxLen > 20){
                Console.WriteLine("Zadejte menší číslo");
            }

/* */
            for (int i = 0; i < maxLen; i++){
                arr[i] = int.Parse(Console.ReadLine());


                if (i == 0) { min = arr[i]; max = arr[i]; }
                if ( i > 0){
                    min = arr[i]; max = arr[i];
                    if (arr[i] > max) {max = arr[i]; }
                    if (arr[i] < min) { min = arr[i]; }
                }


                if (((arr[i] == max) && (smax == 0)) || ((arr[i] == max) && (smin == 0))) {
                    if (arr[i] == max) { smax = 1; }
                    if (arr[i] == min) { smin = 1; }

                } else {
                    Console.WriteLine(arr[i]);
                }
            }



        }
    }
}
