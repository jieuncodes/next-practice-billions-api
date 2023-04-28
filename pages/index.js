import { useEffect, useState } from "react";
import { getAllBillionaires } from "../utils/api/api.js";
import { formatAsset } from "../utils/formatNumbers.js";
import Link from "next/link.js";

export default function IndexPage() {
  const [billionaires, setBillionaires] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllBillionaires();
        setBillionaires(data);
      } catch (error) {
        console.error("Error fetching billionaires:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="list">
        {billionaires.map((billionaire, index) => (
          <Link
            key={billionaire.id}
            href={`/billionaire/${billionaire.id}`}
            passHref
          >
            <a className="card">
              <div className="photo">
                <img src={billionaire.squareImage} />
              </div>
              <div className="full-name">{billionaire.name}</div>
              <div className="info">
                <span className="asset">
                  {formatAsset(billionaire.netWorth)}
                </span>
                <span>/ </span>
                <span className="industries">{billionaire.industries}</span>
              </div>
            </a>
          </Link>
        ))}
      </div>

      <style jsx>{`
        a {
          text-decoration: none;
          color: inherit;
        }
        .container {
          width: 100vw;
        }
        .list {
          display: grid;
          grid-template-columns: repeat(4, minmax(200px, 1fr));
          gap: 10px;
        }
        .card {
          padding: 20px;
          background-color: #f5f5f5;
          border-radius: 10px;
        }
        .card:hover {
          cursor: pointer;
        }
        .photo img {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }
        .full-name {
          margin-top: 10px;
          font-size: 1.2rem;
          font-weight: bold;
        }
        .info {
          margin-top: 5px;
          font-size: 1rem;
        }
        .asset {
          display: inline-block;
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
}
