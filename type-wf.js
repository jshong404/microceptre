<!doctype html>
<html>
<body>
    <script>
        //implement checks for well formed microceptre types.

        //SetNames
        var setNames = ['people', 'objects', 'locations'];

        var set_elements =
        [['people', 'Alexander'],
        ['people', 'Naz'],
        ['objects', 'toaster'],
        ['objects', 'apple'],
        ['locations', 'moon'],
        ['locations', 'saturn']];
     
        var at_predicate = { name: 'at', arg_types: ['objects', 'locations'] }

        var likes_predicate = { name: 'likes', arg_types: ['people', 'people'] }
		
	var at_bad_predicate = {name:3, arg_types:[]}

        var at_bad_predicate2 = { name: 'yes', arg_types: ['foo', 'bar'] }		

        var at_atom = { name: 'at', args: ['toaster', 'moon'] };

        var likes_atom = { name: 'likes', args: ['Alexander', 'Naz'] };

        var likes_bad_atom = { name: 'likes', args: ['toaster', 'Naz'] };

        var pred_decls = [at_predicate, likes_predicate]

	//check uniqueness
        function check_well_formed_binding(binding) {
            var wellFormed = false;
            for (x in setNames)
                if (binding.type === setNames[x])
                    wellFormed = true;
            wellFormed = wellFormed && typeof binding.id === 'string';
            return wellFormed;
        }

        function check_well_formed_set(set) {
            var wellFormed = true;
            for (x in set.elements)
                if(typeof set.elements[x] !== 'string')
                    wellFormed = false;
            wellFormed = wellFormed && typeof set.name === 'string';
            return wellFormed;
        }

        function check_well_formed_pred_decl(pred_decl) {
            var wellFormed = true;
            for (y in pred_decl.arg_types) {
                wellFormed = wellFormed && inArray(setNames, pred_decl.arg_types[y]);
            }
            wellFormed = wellFormed && typeof pred_decl.name === 'string';
            return wellFormed;
        }

        function check_well_formed_rule(rule) {
            var wellFormed = true;
            for (x in vars)
                wellFormed = wellFormed && check_well_formed_binding(vars[x]);

        }

        function check_well_formed_atom(atom) {
            var wellFormed = false;
            wellFormed = is_name_of_pred_decl(atom.name);
            if (wellFormed)
                var pred_decl_for_atom = get_pred_by_name(atom.name);
            for (x in atom.args)
                wellFormed = wellFormed && inSetArray(set_elements, pred_decl_for_atom.arg_types[x], atom.args[x]);
            return wellFormed;
        }

        //Returns true if the argument element is contained in the argument array
        function inArray(array, element) {
            for (x in array)
                if (element == array[x])
                    return true;
            return false;
        }

        //Returns true if the argument element is contained in the argument array of set elements
        function inSetArray(array, set, element) {
            for (x in array)
                if (element == array[x][1] && set == array[x][0])
                    return true;
            return false;
        }

        //Returns true if argument "name" is the name field of a predicate declaration
        function is_name_of_pred_decl(name) {
            for (x in pred_decls)
                if (pred_decls[x].name == name)
                    return true;
            return false;
        }

        function get_pred_by_name(name) {
            for (x in pred_decls)
                if (pred_decls[x].name == name)
                    return pred_decls[x];
            return null;
        }
    </script>
</body>
</html>
