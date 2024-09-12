class RecintosZoo {
    analisaRecintos(animal_upper, quantidade) {
        var recintosViaveis =[];
        var animal = animal_upper.toLowerCase();
        if(quantidade == 0)
        {
            return {
                erro:"Quantidade inválida"
            }
        }

        for(let i = 0; i<6; i++)
        {
            if(animal == animal_struct[i].especie_a)
            {
                break;
            } else if (i == 5)
            {
                return{
                 erro: "Animal inválido"
                }
                    
            }
        }
        var get_animal = animal_struct.filter(elemento => elemento.especie_a == animal);
        var array_sort = [];
        if(get_animal[0].bioma_a.includes(' '))
        {
            var biomes = get_animal[0].bioma_a.split(' ');
            verify(biomes[0], animal,get_animal, quantidade, array_sort);
            verify(biomes[1], animal,get_animal, quantidade, array_sort);
        } else{
            verify(get_animal[0].bioma_a, animal,get_animal, quantidade, array_sort)
        }
        array_sort.sort((a,b) => a.num_r - b.num_r);
        if(array_sort.length == 0)
        {
            return{
                erro: "Não há recinto viável"
            }
        } else{
            for(let i = 0; i<array_sort.length; i++)
            {
                recintosViaveis.push('Recinto '+ array_sort[i].num_r +' (espaço livre: '+ array_sort[i].tam_r+' total: '+array_sort[i].tamanho_total+')');
            }
        }
    
    console.log(recintosViaveis);
    return {
        recintosViaveis: recintosViaveis
    }
    
    }
        
    }
    
    function verify(biome, animal, get_animal, quantidade, array){
        var get_recintos = recinto.filter(objeto => objeto.bioma_r.includes(biome));
        for(let i = 0; i < get_recintos.length; i++)
        {
            var space = get_recintos[i].tam_r - (get_recintos[i].space_animal * get_recintos[i].qtd_animal_r);
            if(animal != get_recintos[i].animal_r && get_recintos[i].animal_r != 'vazio')
            {
                space --;
            }
            if(space >= (get_animal[0].tam_a * quantidade))
            {
                if(animal == 'macaco' && get_recintos[i].animal_r == 'vazio' && quantidade < 2)
                {
                    continue
                }
                if(animal == 'hipopotamo' && get_recintos[i].bioma_r != 'savana rio' && get_recintos[i].animal_r != 'hipopotamo' && get_recintos[i].animal_r != 'vazio')
                {
                    continue
                }

                if(animal != 'hipopotamo' && get_recintos[i].bioma_r != 'savana rio' && get_recintos[i].animal_r == 'hipopotamo')
                    {
                        continue
                    }

                if(get_recintos[i].carnivoro == null)
                {
                    space -= get_animal[0].tam_a * quantidade;
                    //console.log('animal colocado no recinto:', get_recintos[i].num_r, 'sobrou',space);
                    get_recintos[i].tam_r = space;
                    get_recintos[i].qtd_animal_r += quantidade;
                    get_recintos[i].carnivoro = get_animal[0].carnivoro;
                    get_recintos[i].animal_r = animal;
                    array.push(get_recintos[i]);
                }
                else if((get_recintos[i].animal_r == 'hipopotamo' || animal == 'hipopotamo') && get_recintos[i].bioma_r == 'savana rio')
                {
                    space -= get_animal[0].tam_a * quantidade;
                    //console.log('animal colocado no recinto:', get_recintos[i].num_r, 'sobrou',space);
                    get_recintos[i].tam_r = space;
                    get_recintos[i].qtd_animal_r += quantidade;
                    get_recintos[i].carnivoro = get_animal[0].carnivoro;
                    array.push(get_recintos[i]);
                }
                else if(get_recintos[i].animal_r == 'hipopotamo' && animal == 'hipopotamo' && get_recintos[i].bioma_r != 'savana rio')
                    {
                        space -= get_animal[0].tam_a * quantidade;
                        //console.log('animal colocado no recinto:', get_recintos[i].num_r, 'sobrou',space);
                        get_recintos[i].tam_r = space;
                        get_recintos[i].qtd_animal_r += quantidade;
                        get_recintos[i].carnivoro = get_animal[0].carnivoro;
                        array.push(get_recintos[i]);
                    }
                else if(get_recintos[i].carnivoro == false && get_animal[0].carnivoro == false)
                {
                    space -= get_animal[0].tam_a * quantidade;
                    //console.log('animal colocado no recinto:', get_recintos[i].num_r, 'sobrou',space);
                    get_recintos[i].tam_r = space;
                    get_recintos[i].qtd_animal_r += quantidade;
                    get_recintos[i].carnivoro = get_animal[0].carnivoro;
                    array.push(get_recintos[i]);
                } else if(get_recintos[i].carnivoro == true && animal == get_recintos[i].animal_r)
                {
                    space -= get_animal[0].tam_a * quantidade;
                    //console.log('animal colocado no recinto:', get_recintos[i].num_r, 'sobrou',space);
                    get_recintos[i].tam_r = space;
                    get_recintos[i].qtd_animal_r += quantidade;
                    get_recintos[i].carnivoro = get_animal[0].carnivoro;
                    array.push(get_recintos[i]);
                }
            }
    
        }

}


const recinto = [
    {num_r: 1, bioma_r: 'savana', tamanho_total: 10, tam_r: 10, animal_r: 'macaco', space_animal: 1, qtd_animal_r: 3, carnivoro: false},
    {num_r: 2, bioma_r: 'floresta', tamanho_total: 5, tam_r: 5, animal_r: 'vazio', space_animal: 0, qtd_animal_r: 0, carnivoro: null},
    {num_r: 3, bioma_r: 'savana rio', tamanho_total: 7, tam_r: 7, animal_r: 'gazela',space_animal: 2, qtd_animal_r: 1, carnivoro: false},
    {num_r: 4, bioma_r: 'rio', tamanho_total: 8, tam_r: 8, animal_r: 'vazio',space_animal: 0, qtd_animal_r: 0, carnivoro: null},
    {num_r: 5, bioma_r: 'savana', tamanho_total: 9, tam_r: 9, animal_r: 'leao', space_animal: 3, qtd_animal_r: 1, carnivoro: true}
]

const animal_struct = [
    {especie_a: 'leao', tam_a: 3, bioma_a: 'savana', carnivoro: true},
    {especie_a: 'leopardo', tam_a: 2, bioma_a: 'savana', carnivoro: true },
    {especie_a: 'crocodilo', tam_a: 3, bioma_a: 'rio', carnivoro: true },
    {especie_a: 'macaco', tam_a: 1, bioma_a: 'savana floresta', carnivoro: false },
    {especie_a: 'gazela', tam_a: 2, bioma_a: 'savana', carnivoro: false },
    {especie_a: 'hipopotamo', tam_a: 4, bioma_a: 'savana rio', carnivoro: false }
]

 /*var get_animal = animal_struct.filter(elemento => elemento.especie_a.includes('lea'));
console.log(get_animal);*/


export { RecintosZoo as RecintosZoo };
