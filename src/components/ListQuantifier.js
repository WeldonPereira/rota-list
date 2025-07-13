const ListQuantifier = ({ list, onReset }) => {
  if (typeof list !== "string") return null;

  const lines = list
    .split(/\r?\n|,/)
    .map((l) => l.trim())
    .filter(Boolean);

  const temFormatoValido = lines.some((line) => /^\d+\s*-\s*/.test(line));

  if (!temFormatoValido) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center text-red-600">
        <p className="text-lg font-semibold">
          O formato da lista está incorreto. <br />
          Certifique-se de que cada item comece com um número seguido de hífen,
          como no exemplo:
        </p>
        <pre className="mt-4 bg-gray-100 p-4 rounded text-left text-sm text-zinc-700 max-w-md mx-auto whitespace-pre-wrap">
          {`1- Weldon (ida/volta)UFPE
2- Igor (ida/volta) UFPE
3- Ryhan (ida/volta) UFPE
...`}
        </pre>
        <button
          onClick={onReset}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Voltar e corrigir
        </button>
      </div>
    );
  }

  const entries = list
    .split(/\d+\s*[-–—]\s*/)
    .map((item) => item.trim())
    .filter(Boolean);

  const regex = {
    idaVolta: /(ida\s*(\/|e|-)\s*volta|ida\s*e\s*volta)/i,
    ida: /\bida\b/i,
    volta: /\bvolta\b/i,
    ufpe: /\b(ufpe|ufp|uf)\b/i,
  };

  const count = {
    ufpe: { ida: 0, volta: 0 },
    derby: { ida: 0, volta: 0 },
  };

  const nomes = {
    ufpe: { ida: [], volta: [] },
    derby: { ida: [], volta: [] },
  };

  let temVolta = false;

  for (const entry of entries) {
    const lower = entry.toLowerCase();

    const destino = regex.ufpe.test(lower) ? "ufpe" : "derby";

    const nome = entry
      .replace(/[\(\[].*?[\)\]]/g, "")
      .replace(/\b(ida|volta|ida\/volta|ida-e-volta|ida-volta|derby|Derby|estacio|Estácio)\b/gi, "")
      .replace(/ufpe|ufp|uf/gi, "")
      .replace(/[-–—]/g, "")
      .trim();

    const ida = regex.idaVolta.test(lower) || regex.ida.test(lower);
    const volta = regex.idaVolta.test(lower) || regex.volta.test(lower);

    if (ida) {
      count[destino].ida++;
      nomes[destino].ida.push(nome);
    }

    if (volta) {
      count[destino].volta++;
      nomes[destino].volta.push(nome);
      temVolta = true;
    }
  }

  if (!temVolta && count.ufpe.ida + count.derby.ida === 0) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center text-zinc-700">
        <p className="text-lg font-medium">
          A lista fornecida não contém informações suficientes sobre ida ou
          volta. <br />
          Verifique se você incluiu expressões como <strong>“ida”</strong>,{" "}
          <strong>“volta”</strong> ou <strong>“ida/volta”</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-8 px-4">
      {onReset && (
        <div className="flex justify-end mb-4">
          <button
            onClick={onReset}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Voltar à tela inicial
          </button>
        </div>
      )}

      <h2 className="text-2xl font-bold text-zinc-800">Resumo da Lista</h2>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border border-gray-300">
          <thead className="bg-zinc-900 text-white">
            <tr>
              <th className="py-3 px-6 border border-gray-300">Destino</th>
              <th className="py-3 px-6 border border-gray-300">Ida</th>
              <th className="py-3 px-6 border border-gray-300">Volta</th>
            </tr>
          </thead>
          <tbody className="bg-white text-zinc-800 text-base">
            <tr className="even:bg-gray-50">
              <td className="py-3 px-6 border border-gray-300 font-semibold">
                UFPE
              </td>
              <td className="py-3 px-6 border border-gray-300">
                {count.ufpe.ida}
              </td>
              <td className="py-3 px-6 border border-gray-300">
                {count.ufpe.volta}
              </td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="py-3 px-6 border border-gray-300 font-semibold">
                DERBY
              </td>
              <td className="py-3 px-6 border border-gray-300">
                {count.derby.ida}
              </td>
              <td className="py-3 px-6 border border-gray-300">
                {count.derby.volta}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {["ufpe", "derby"].map((destino) => (
          <div
            key={destino}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-zinc-800 mb-4 uppercase">
              {destino}
            </h3>

            <div className="mb-4">
              <h4 className="text-lg font-medium text-blue-700 mb-1">Ida</h4>
              {nomes[destino].ida.length > 0 ? (
                <ul className="list-disc pl-5 text-sm text-zinc-700 space-y-1">
                  {nomes[destino].ida.map((nome, i) => (
                    <li key={i}>{nome}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-500">Nenhum nome.</p>
              )}
            </div>

            <div>
              <h4 className="text-lg font-medium text-green-700 mb-1">Volta</h4>
              {nomes[destino].volta.length > 0 ? (
                <ul className="list-disc pl-5 text-sm text-zinc-700 space-y-1">
                  {nomes[destino].volta.map((nome, i) => (
                    <li key={i}>{nome}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-500">Nenhum nome.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListQuantifier;
