
export class PokeImageTransform {
  public static TransformImage(pokeId: number){
    return `https://oi.flyimg.io/upload/w_273/https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${PokeImageTransform.LeftPad(pokeId, 3)}.png`
    // return `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${PokeImageTransform.LeftPad(pokeId, 3)}.png`
  }

  public static LeftPad = (number: number, targetLength: number): string => {
    let output = Math.abs(number).toString();
    while (output.length < Math.abs(targetLength)) {
      output = "0" + output;
    }
    return output;
  };
}
