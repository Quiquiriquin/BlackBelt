#include <iostream>
#include <stack>
#include <string>
#include <thread>
#include <vector>

using namespace std;

int main () {

    string words;
    vector <string>  ans;

    string palabra = "";

    getline(cin,words);

    for(int i = 0; i < words.length(); i++){
    	if( words[i] == ' ' || words[i] == '\0'){
    		cout << palabra << "\n";
    		ans.push_back(palabra);
    		palabra = "";
    	} else {
    		palabra += words[i];
    	}
    }


    for(int j = ans.size() ; j >= 0; j--){
    	if(j == ans.size()){
    		cout << ans[j];
    	} else {
    		cout << ans[j] << " ";
    	}
    	
    }



    return 0;
}