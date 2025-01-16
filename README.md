## Prétraitement et Index Inversé
Prétraitement

Le prétraitement des documents est une étape essentielle pour garantir la cohérence et la qualité des données avant l’indexation. Voici les étapes suivies :
1. Normalisation du Texte

Le texte est converti en minuscules afin d’éliminer la sensibilité à la casse, et les caractères spéciaux, ponctuations et symboles non alphanumériques sont supprimés.

Exemple :
Entrée : "Le Football est Amusant!"
Sortie : "le football est amusant"

2. Tokenisation

Le texte normalisé est divisé en mots individuels, appelés tokens.

Exemple :
Entrée : "le football est amusant"
Sortie : ["le", "football", "est", "amusant"]

3. Suppression des Mots Vides

Les mots courants (comme "et", "le", "est") qui n’apportent pas de valeur significative sont retirés à l’aide d’une liste prédéfinie.

Exemple :
Entrée : ["le", "football", "est", "amusant"]
Sortie : ["football", "amusant"]

4. Lemmatisation

Les mots sont réduits à leur forme de base ou canonique pour uniformiser les données (par exemple, "joueurs" devient "joueur").

Exemple :
Entrée : ["jouant", "joueurs"]
Sortie : ["jouer", "joueur"]

Résultat Final

Après ces étapes, les tokens obtenus sont propres, cohérents et prêts pour l’indexation.

#### Index Inversé

Un index inversé est une structure de données qui relie chaque terme à la liste des documents dans lesquels il apparaît, accompagné de son score TF-IDF. Cela permet une recherche rapide et efficace.
Structure de l’Index

L’index est stocké sous forme d’un objet JSON où chaque terme est associé aux documents et à leurs poids TF-IDF.

Exemple :

{
  "football": {
    "doc1": 0.3456,
    "doc2": 0.5678
  },
  "amusant": {
    "doc1": 0.1234,
    "doc3": 0.4321
  }
}

Étapes de Construction

1. Prétraitement

Chaque document est soumis aux étapes de prétraitement décrites ci-dessus.

2. Calcul de la Fréquence des Termes (TF)

La fréquence d’un terme tt dans un document dd est calculée comme le rapport du nombre d’occurrences de tt sur le nombre total de termes dans dd.

Exemple :
Terme : "football", Nombre d’occurrences : 5, Total de mots : 100
TF=5100=0.05TF=1005​=0.05

3. Calcul de la Fréquence Inverse des Documents (IDF)

L’importance d’un terme dans la collection entière est calculée à l’aide de la formule :
IDF=log⁡10NntIDF=log10​nt​N​, où NN est le nombre total de documents et ntnt​ le nombre de documents contenant tt.

Exemple :
Terme : "football", N=100N=100, nt=10nt​=10
IDF=log⁡1010010=1.0000IDF=log10​10100​=1.0000

4. Calcul du Poids TF-IDF

Le score TF-IDF d’un terme dans un document est obtenu en multipliant TFTF et IDFIDF.

Exemple :
TF=0.05TF=0.05, IDF=1.0000IDF=1.0000
TF−IDF=0.05×1.0000=0.0500TF−IDF=0.05×1.0000=0.0500

5. Stockage de l’Index

Les résultats sont enregistrés dans un fichier JSON (par exemple, index_inversé.json) pour permettre une recherche rapide.

Exemple de Fichier JSON :

{
  "football": {
    "doc1": 0.3456,
    "doc2": 0.5678
  },
  "amusant": {
    "doc1": 0.1234,
    "doc3": 0.4321
  }
}

Avantages de l’Index Inversé

    Recherche Rapide : Identifie efficacement les documents pertinents.
    Évolutivité : Convient aux grandes bases de documents.
    Réutilisation Facile : Le format JSON est portable et pratique.

Similarité Cosinus

La similarité cosinus est utilisée pour mesurer la correspondance entre une requête et un document en comparant leurs vecteurs TF-IDF.
Pourquoi l’utiliser ?

    Précision : Identifie les documents les plus pertinents en fonction des termes partagés.
    Scores Normalisés : Les valeurs varient entre 0 (aucune similitude) et 1 (similitude parfaite).
    Efficacité : S’applique bien à des données textuelles éparses.

### Fonctionnement

La similarité est calculée en mesurant l’angle entre les vecteurs. Plus l’angle est petit, plus les vecteurs sont similaires.
Exemples de Requêtes

    "Quels sont les meilleurs joueurs de football ?"
    "Comment le football influence-t-il la culture mondiale ?"
    "Quel est l’impact économique des grandes compétitions ?"
    "Comment la technologie VAR a-t-elle changé le jeu ?"

    "Quelles sont les tactiques courantes en football moderne ?"
    "Comment les clubs recrutent-ils de nouveaux talents ?"

