import {useNavigate} from "react-router-dom";

function Blueprints({BlueprintData}: any) {
  console.log(BlueprintData)
  const navigate = useNavigate();

  return (
    <section className='blueprintDisplayer'>
      <div>
        We'll display the different form options here.
        <p />
        {BlueprintData?.nodes?.map((node: any) => (
          <div className="Blueprint Names" key={node.id}>
            <p className={node.id} onClick={() => navigate(`/nodes/${node.data.name}`)}>
              {JSON.stringify(node.data.name)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Blueprints;
