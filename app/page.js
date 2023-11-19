"use client";
import { useState, useEffect } from "react";
import { collection, addDoc,getDoc, query, onSnapshot,deleteDoc,doc } from "firebase/firestore";
import { db } from "./firebase";
import { FaGithub } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import Link from "next/link";

export default function Home() {
  const euro = 30.12
  const dolar = 28.12
  const [items, setItems] = useState([
    // { name: "Coffee", price: "4,95" },
    // { name: "Movie", price: "12,95" },
    // { name: "Coffee", price: "9,95" },
  ]);

  const [newItem, setNewItem] = useState({ name: "", price: "" });

  const [total, setTotal] = useState(0);

  //Add items database

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem !== '' && newItem.price !== '') {
      setItems([...items,newItem])
      await addDoc(collection(db,'items'),{
        name:newItem.name.trim(),
        price:newItem.price,
      })
      setNewItem({name:'', price:''})
    }
    else{
      alert("Herhangi Bir Harcama ve Fiyat Girmelisiniz!")
    }
    
  };

  //Read items database



  useEffect(()=> {
    const q = query(collection(db,'items'))
    const unsubcribe = onSnapshot (q,(querySnapshot) => {
      let itemsArr = []
      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(),id:doc.id})
      })
      setItems(itemsArr)
      //Read total items
      const calculateTotal = () =>{
        const totalPrice = itemsArr.reduce ((sum,item) => sum + parseFloat(item.price),0)
        setTotal(totalPrice)
      };
      calculateTotal();
      return () => unsubcribe();
    })

  },[])

  //Delete items database

  const deleteItem = async(id) => {
    await deleteDoc(doc(db,'items', id)) 

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-12 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm ">
        <h1 className="text-xl sm:text-4xl p-4 text-center">Harcamanı Hesapla</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name:e.target.value})}
              className="col-span-3 p-3 border"
              type="text"
              placeholder="Harcama Gir"
            />
            <input
              value={newItem.price}
              onChange={(e) => setNewItem({...newItem, price:e.target.value})}
              className="col-span-2 p-3 border mx-3"
              type="text"
              placeholder="Kaç ₺"
            />
            <button
            
            onClick={addItem}
              className="text-white bg-slate-950
          hover:bg-slate-900 p-3 text-xl items-center justify-center inline-flex  w-full text-center mx-auto"
              type="sumbit"
              placeholder="Enter Item"
            >
              <MdAddShoppingCart className="text-xl"/>
              <span className="ml-2 hidden sm:block" >Ekle</span>
            </button>
          </form>

          <ul>
            <li className="my-4 w-full flex justify-between bg-slate-950">
              <div className="p-4  text-xl w-full flex justify-between">
                <span className="text-sm sm:text-2xl capitalize underline">Harcama Adı</span>
                <span className="text-sm sm:text-2xl  underline">Harcama Miktarı ₺</span>
              </div>
            </li>
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-slate-950"
              >
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>{item.price} ₺</span>
                </div>
                <button 
                onClick={()=> deleteItem(item.id)}
                className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16">
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="flex justify-between p-3">
              <span className="text-sm sm:text-xl font-extrabold border-b-2">Toplam:</span>
              <span className='text-sm sm:text-xl font-extrabold border-b-2'>{(total/dolar).toFixed(2)} $</span>
              <span className='text-sm sm:text-xl font-extrabold border-b-2'>{(total/euro).toFixed(2)} €</span>
              <span className='text-sm sm:text-xl font-extrabold border-b-2'>{total} ₺</span>
           

            </div>
          )}
        </div>
      </div>
      <div>
        <div className="w-full flex flex-shrink-0 items-center justify-center mt-10">
          <span className="font-mono">Kodlara ulaşmak için</span> 
          <Link className="ml-5" href="https://github.com/aliosmanbaskurt/expensetracker" target="self"> <FaGithub className="m-0 text-4xl items-center justify-center"/> </Link>
        </div>
            
      </div>
    </main>
  );
}
