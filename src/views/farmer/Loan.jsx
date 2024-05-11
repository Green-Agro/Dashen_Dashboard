import Card from "../../components/Card"
import useFarmerData from '../../url/farmer/FarmerDataService';

const Loan = (props) =>{
    const farmerData = useFarmerData();
    if (!farmerData) {
        return <div>Loading...</div>;
      }
    return(
        <div className="flex flex-row  gap-6 justify-center">
        <div>
            <Card>
               {farmerData.Score}
            </Card>
          <h2 className="flex justify-center font-bold text-lg ">Creadit Score</h2>
        </div>
        <div>
            <Card>
                {farmerData.Weighted_Score}
            </Card>
            <h2 className="flex justify-center font-bold text-lg">Percentile</h2>
        </div>

        </div>
       
    )
}
export default Loan