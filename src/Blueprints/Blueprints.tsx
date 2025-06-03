
function Blueprints({ BlueprintData }:any) {

  return (
    <section className='blueprintDisplayer'>
      <div> 
        We'll make some blueprints show up here!
        <p /> 

        {JSON.stringify(BlueprintData)}
         </div>
    
    </section>
  );
}

export default Blueprints;



// TODO: render blueprints as forms
// define each form as a different route/link, with default values based on parent node (if applicable)
// create menu to display possible prefill data based on forms filled for any direct parent node
// as well as any indirect parent nodes and global data.
// Any new forms/data added to the mock server data
// should appear as options in the menu without needing to be manually added.
