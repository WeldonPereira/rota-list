const ListQuantifier = ({ list }) => {
  if (typeof list !== "string") return null;

  const items = list
    .split(/\d+\s*-\s*/)
    .map((e) => e.trim())
    .filter(Boolean);

  const idaVoltaRegex = /\b(ida\s*(\/|e)\s*volta|ida\s*e\s*volta)\b/i;
  const idaOnlyRegex = /\bida\b/i;
  const voltaOnlyRegex = /\bvolta\b/i;
  const ufpeRegex = /ufpe/i;

  let ufpeIda = 0;
  let ufpeVolta = 0;
  let outrosIda = 1;
  let outrosVolta = 1;

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
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Resumo da lista</h2>
      <div className="overflow-x-auto shadow-lg">
        <table className="w-full text-center border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-4 px-6 border border-gray-300">Destino</th>
              <th className="py-4 px-6 border border-gray-300">Ida</th>
              <th className="py-4 px-6 border border-gray-300">Volta</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white even:bg-gray-50">
              <td className="py-3 px-4 border border-gray-300">UFPE</td>
              <td className="py-3 px-4 border border-gray-300">{ufpeIda}</td>
              <td className="py-3 px-4 border border-gray-300">{ufpeVolta}</td>
            </tr>
            <tr className="bg-white even:bg-gray-50">
              <td className="py-3 px-4 border border-gray-300">DERBY</td>
              <td className="py-3 px-4 border border-gray-300">{outrosIda}</td>
              <td className="py-3 px-4 border border-gray-300">{outrosVolta}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListQuantifier;
