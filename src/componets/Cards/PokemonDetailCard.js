const STAT_LABELS = ["HP", "攻撃", "防御", "特攻", "特防", "素早さ"];

const extractStatsArray = (statsObj) => {
  if (!statsObj || typeof statsObj !== "object") return [];

  return [
    statsObj["hp"],
    statsObj["attack"],
    statsObj["defense"],
    statsObj["special-attack"],
    statsObj["special-defense"],
    statsObj["speed"]
  ];
};


function PokemonDetailCard({ pokemon }) {
  if (!pokemon || !pokemon.id) return <div>読み込み中...</div>;
    
    const statsArray = extractStatsArray(pokemon.stats);
    console.log(statsArray);
    
  return (
    <div>
        <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded-xl">
            {/* 上部：画像 + 基本情報 */}
            <div className="flex gap-6 items-start">
                <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-48 h-48 object-contain"
                />

                <div>
                    <h2 className="text-2xl font-bold">
                        図鑑No.{pokemon.id.toString().padStart(3, "0")} {pokemon.name}
                    </h2>
                    <p className="text-gray-600 mb-1">{pokemon.genus}</p>

                    <div className="mb-1">
                        <span className="font-semibold">タイプ:</span>{" "}
                        {Array.isArray(pokemon.types)
                            ? pokemon.types.join("  ")
                            : typeof pokemon.types === "string"
                            ? pokemon.types
                            : "不明"}
                    </div>

                    <div className="mb-1">
                        <span className="font-semibold">高さ:</span> {pokemon.height / 10} m
                        <span className="ml-4 font-semibold">重さ:</span> {pokemon.weight / 10} kg
                    </div>

                    <div className="mb-1">
                        <span className="font-semibold">特性:</span>{" "}
                        {Array.isArray(pokemon.abilityName)
                            ? pokemon.abilityName.join(" / ")
                            : typeof pokemon.abilityName === "string"
                            ? pokemon.abilityName
                            : "不明"}
                    </div>

                    <div>
                        <p className="text-sm text-gray-700">{pokemon.abilityFlavor_text}</p>
                    </div>
                </div>
            </div>

            {/* 図鑑説明文 */}
            <div className="mt-6">
                <h3 className="font-semibold mb-1">図鑑説明</h3>
                <p className="text-gray-800">{pokemon.flavor_text}</p>
            </div>

            {/* 種族値（テキスト表示） */}
            <div className="mt-6">
                <h3>種族値</h3>
                <ul>
                    {statsArray.map((value, index) => (
                    <li key={index}>
                        {STAT_LABELS[index]}: {value}
                    </li>
                    ))}
                </ul>
            </div>


        </div>
    </div>
  );
}
export default PokemonDetailCard;