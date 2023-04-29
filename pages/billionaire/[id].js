import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBillionaireById } from "../../utils/api/api";
import { formatAsset, formatWithCommas } from "../../utils/formatNumbers";

export default function BillionairePage() {
  const router = useRouter();
  const { id } = router.query;
  const [billionaire, setBillionaire] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBillionaireById(id);
        setBillionaire(data);
      } catch (error) {
        console.error("Error fetching billionaire:", error);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <>
      {!billionaire ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
          <div className="card">
            <div className="photo">
              <img src={billionaire.squareImage} />
            </div>
            <div className="details">
              <span className="fullName">{billionaire.name}</span>
              <span className="networth">
                Networth : {formatAsset(billionaire.netWorth)}
              </span>

              <span className="country">Country : {billionaire.country}</span>

              <span className="industry">
                Industry : {billionaire.industries}
              </span>

              <span className="bio">{billionaire.bio}</span>
            </div>
            <div className="financial-assets">
              <h1>Financial Assets</h1>
              <div className="tickerCards">
                {billionaire.financialAssets.map((asset, id) => {
                  return (
                    <div className="assetCard" key={id}>
                      <span className="ticker">Ticker : {asset.ticker}</span>
                      <span className="shares">
                        Shares : {formatWithCommas(asset.numberOfShares)}
                      </span>
                      <span className="excersiePrice">
                        Excersie Price : ${asset.sharePrice}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <style jsx>{`
            .container {
              width: 100vw;
              margin-top: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .card {
              padding: 50px;
              width: 70%;
              background-color: #ffffff;
              border-radius: 10px;
            }
            .details {
              margin-top: 20px;
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }
            .photo img {
              height: auto;
              border-radius: 10px;
            }
            .fullName {
              font-size: 1.5rem;
              font-weight: bold;
            }
            .networth,
            .country,
            .industry,
            .bio {
              font-size: 1.2rem;
            }
            .financial-assets {
              margin-top: 50px;
            }
            h1 {
              margin-bottom: 20px;
            }
            .tickerCards {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 10px;
            }
            .assetCard {
              display: flex;
              flex-direction: column;
              gap: 10px;
              background-color: #f5f5f5;
              padding: 20px;
              border-radius: 10px;
            }
            .ticker,
            .shares,
            .excersiePrice {
              font-weight: bold;
              font-size: 1.1rem;
            }
          `}</style>
        </div>
      )}
    </>
  );
}
