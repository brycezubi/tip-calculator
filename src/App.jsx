import { useState, useEffect } from "react";
import IconDollar from "/images/icon-dollar.svg";
import IconPerson from "/images/icon-person.svg";

function App() {
  const [bill, setBill] = useState("");
  const [person, setPerson] = useState("");
  const [tip, setTip] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);
  const [custom, setCustom] = useState("");

  const porcentajes = [5, 10, 15, 25, 50];

  const calculate = (e) => {
    e.preventDefault();
    const valor = e.target.textContent;
    if (valor == "5%") {
      setTip(bill * 0.05);
    } else if (valor == "10%") {
      setTip(bill * 0.1);
    } else if (valor == "15%") {
      setTip(bill * 0.15);
    } else if (valor == "25%") {
      setTip(bill * 0.25);
    } else if (valor == "50%") {
      setTip(bill * 0.5);
    }
  };

  const reset = (e) => {
    e.preventDefault();
    setBill("");
    setPerson("");
    setTip(0);
    setTipAmount(0);
    setCustom("");
  };

  const formatearCantidad = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const propina = tip / person;
    setTipAmount(propina);
  }, [person]);

  useEffect(() => {
    setTip((custom * bill) / 100);
  }, [custom]);

  return (
    <div className="container mx-auto w-5/6">
      <h1 className="text-green-900 uppercase text-center">Splitter</h1>

      <section className="my-5 max-w-screen-lg">
        <form className="flex flex-col gap-8 bg-white py-14 px-12 rounded-3xl lg:grid md:grid-cols-2 md:gap-x-12">
          <div>
            <div className="relative flex flex-col gap-1">
              <label className="text-2xl text-cyan-700" htmlFor="bill">
                Bill
              </label>
              <input
                className="py-1 px-6 text-right bg-gray-100 rounded-lg "
                type="number"
                id="bill"
                maxLength={8}
                placeholder="125.55"
                value={bill}
                onChange={(e) => setBill(+e.target.value)}
              />
              <img
                className="w-5 absolute bottom-5  left-4"
                src={IconDollar}
                alt="icon dollar tip"
              />
            </div>
            <div className="my-8">
              <label className="text-2xl text-cyan-700" htmlFor="custom">
                Select tip %
              </label>
              <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                {porcentajes.map((p, index) => (
                  <li key={index}>
                    <button
                      onClick={calculate}
                      className="bg-green-950 text-white hover:bg-emerald-600  focus:bg-cyan-500  w-full rounded-lg py-4 text-3xl">
                      {p}%
                    </button>
                  </li>
                ))}

                <input
                  className="capitalize text-center bg-gray-100 rounded-lg placeholder:text-3xl"
                  type="number"
                  placeholder="custom"
                  id="custom"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                />
              </ul>
            </div>
            <div className=" relative flex flex-col gap-1">
              <label className="text-2xl text-cyan-700" htmlFor="people">
                Number of People
              </label>
              <input
                className="py-1 px-6 text-right bg-gray-100 rounded-lg"
                type="number"
                id="people"
                maxLength={2}
                placeholder="5"
                value={person}
                onChange={(e) => setPerson(+e.target.value)}
              />
              <img
                className="w-5 absolute bottom-5  left-4"
                src={IconPerson}
                alt="icon dollar tip"
              />
            </div>
          </div>

          <div className="flex flex-col  gap-8 bg-emerald-950 py-10 px-8 rounded-2xl">
            <div className="flex justify-between">
              <p className="text-xl text-white">
                Tip Amount{" "}
                <span className="block text-emerald-700"> / person</span>{" "}
              </p>
              <p className="text-emerald-700">{formatearCantidad(tipAmount)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl text-white">
                Total <span className="block text-emerald-700"> / person</span>{" "}
              </p>
              <p className="text-emerald-700">{formatearCantidad(tip)}</p>
            </div>
            <button
              onClick={reset}
              className="uppercase text-3xl bg-emerald-800 hover:bg-emerald-400 py-4 rounded-lg lg:mt-32">
              Reset
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default App;
