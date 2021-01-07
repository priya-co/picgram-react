import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Card from './Card';

export default function Home() {
  const [data, setdata] = useState({});
  const [origionalData, setOrigionalData] = useState({});

  const getData = () => {
    let url = 'https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json';
    return fetch(url)
      .then((response) => response.json())
      .then((data) => data);
  };

  useEffect(() => {
    getData().then((data) => {
      let copyData = { ...data };
      copyData?.pics?.map((pic) => {
        pic.isLiked = false;
      });
      setOrigionalData(copyData);
      setdata(copyData);
    });
  }, []);

  return (
    <div>
      <Navbar origionalData={origionalData} data={data} setdata={setdata} />
      <Card origionalData={origionalData} data={data} setdata={setdata} />
    </div>
  );
}
