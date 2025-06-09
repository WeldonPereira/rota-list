import "./ListQuantifier.css"

const ListQuantifier = ({ list }) => {
  if (typeof list !== "string") return null;

  const items = list.split(/\d+\s*-\s*/).map(e => e.trim()).filter(Boolean);

  const idaVoltaRegex = /\b(ida\s*(\/|e)\s*volta|ida\s*e\s*volta)\b/i;
  const idaOnlyRegex = /\bida\b/i;
  const voltaOnlyRegex = /\bvolta\b/i;
  const ufpeRegex = /ufpe/i;

  let ufpeIda = 0;
  let ufpeVolta = 0;
  let outrosIda = 0;
  let outrosVolta = 0;

  let temVolta = false;

  for (const item of items) {
    const lower = item.toLowerCase();
    const isUfpe = ufpeRegex.test(lower);

    let countedIda = false;
    let countedVolta = false;

    if (idaVoltaRegex.test(lower)) {
      countedIda = true;
      countedVolta = true;
    } else {
      // Só conta "ida" se for isolada (e não já contada no ida e volta)
      if (idaOnlyRegex.test(lower)) countedIda = true;
      if (voltaOnlyRegex.test(lower)) countedVolta = true;
    }

    if (isUfpe) {
      if (countedIda) ufpeIda++;
      if (countedVolta) ufpeVolta++;
    } else {
      if (countedIda) outrosIda++;
      if (countedVolta) {
        outrosVolta++;
        temVolta = true;
      }
    }
  }

  if (!temVolta) return null;

  return (
    <div>
      <h2>Resumo da lista</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Destino</th>
            <th>Ida</th>
            <th>Volta</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>UFPE</td>
            <td>{ufpeIda}</td>
            <td>{ufpeVolta}</td>
          </tr>
          <tr>
            <td>DERBY</td>
            <td>{outrosIda}</td>
            <td>{outrosVolta}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListQuantifier;
