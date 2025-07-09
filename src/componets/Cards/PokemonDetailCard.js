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
        <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded-xl">
            {/* 上段：画像と名前 */}
                <div className="flex gap-6">
                    <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="w-48 h-48 object-contain"
                    />
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl font-bold">
                            No.{pokemon.id.toString().padStart(3, "0")} {pokemon.name}
                        </h2>
                    </div>
                </div>


                    {/* 中段：左（分類など）＋右（種族値） */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 左下：分類・重さ・高さ・特性 */}
                        <div className="space-y-2">
                            <p className="text-gray-600">分類: {pokemon.genus}</p>
                            <p>
                                <span className="font-semibold">タイプ:</span>{" "}
                                {Array.isArray(pokemon.types)
                                ? pokemon.types.join(" / ")
                                : pokemon.types}
                            </p>
                            <p>
                                <span className="font-semibold">高さ:</span> {pokemon.height / 10} m
                                <span className="ml-4 font-semibold">重さ:</span> {pokemon.weight / 10} kg
                            </p>
                            <p>
                                <span className="font-semibold">特性:</span>{" "}
                                {Array.isArray(pokemon.abilityName)
                                ? pokemon.abilityName.join(" / ")
                                : pokemon.abilityName}
                            </p>
                            <p className="text-sm text-gray-700">{pokemon.abilityFlavor_text}</p>
                        </div>

                        {/* 右下：種族値バー */}
                        <div className="space-y-2">
                        <h3 className="font-semibold mb-2">種族値</h3>
                        {statsArray.map((val, i) => (
                            <div key={i}>
                            <div className="flex justify-between">
                                <span>{STAT_LABELS[i]}</span>
                                <span>{val}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded h-3">
                                <div
                                className="bg-blue-500 h-3 rounded"
                                style={{ width: `${(val / 255) * 100}%` }}
                                ></div>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
        
            {/* 図鑑説明文 */}
            <div className="mt-6">
                <h3 className="font-semibold mb-1">図鑑説明</h3>
                <p className="text-gray-800">{pokemon.flavor_text}</p>
            </div>
        </div>
    );
}
export default PokemonDetailCard;