Prétraitement et Index Inversé
Prétraitement

Le prétraitement prépare les documents pour l'indexation en appliquant plusieurs étapes pour garantir une structure cohérente.
Étapes du Prétraitement

    Normalisation du texte
        Convertir le texte en minuscules.
        Supprimer les caractères spéciaux, ponctuations et symboles non alphanumériques.

    Exemple :
        Entrée : "Le Football est Amusant!"
        Sortie : "le football est amusant"

    Tokenisation
        Découper le texte en mots individuels (tokens).

    Exemple :
        Entrée : "le football est amusant"
        Sortie : ["le", "football", "est", "amusant"]

    Suppression des mots vides
        Retirer les mots courants et peu informatifs comme "et", "le", "est".

    Exemple :
        Entrée : ["le", "football", "est", "amusant"]
        Sortie : ["football", "amusant"]

    Lemmatisation
        Convertir les mots à leur forme de base pour garantir une uniformité (ex. : "joueurs" → "joueur").

    Exemple :
        Entrée : ["jouant", "joueurs"]
        Sortie : ["jouer", "joueur"]

Résultat Final

Les tokens obtenus après ces étapes sont prêts pour l’indexation.
Index Inversé

Un index inversé est une structure de données associant chaque terme aux documents où il apparaît, avec des poids TF-IDF. Cela permet une recherche rapide et précise.
Structure de l'Index

L’index est représenté sous forme JSON, chaque terme étant lié aux documents où il figure avec son score TF-IDF.

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

    Prétraitement des documents
    Chaque document subit les étapes de normalisation, tokenisation, suppression des mots vides et lemmatisation.

    Calcul de la Fréquence des Termes (TF)
    Comptez le nombre d’occurrences d’un terme tt dans un document dd, puis normalisez-le par le nombre total de mots dans dd.
    Exemple :
        Terme : "football"
        Fréquence : TF=5100=0.05TF=1005​=0.05

    Calcul de la Fréquence Inverse des Documents (IDF)
    Déterminez l’importance d’un terme dans la collection complète.
    Exemple :
        Terme : "football"
        IDF=log⁡1010010=1.0000IDF=log10​10100​=1.0000

    Calcul du Poids TF-IDF
    Multipliez TF et IDF pour obtenir le poids du terme dans un document.
    Exemple :
        TF=0.05TF=0.05, IDF=1.0000IDF=1.0000
        TF−IDF=0.05×1.0000=0.0500TF−IDF=0.05×1.0000=0.0500

    Enregistrement de l’Index
    Sauvegardez l’index dans un fichier JSON (par ex. : index_inversé.json).

Avantages de l'Index Inversé

    Recherche rapide : Permet d’identifier efficacement les documents pertinents.
    Évolutivité : Convient aux grandes collections de documents.
    Réutilisation : Format JSON facile à exploiter.

Similarité Cosinus

La similarité cosinus mesure la proximité entre une requête et un document en comparant leurs vecteurs TF-IDF. Elle est idéale pour les comparaisons textuelles.
Pourquoi l'utiliser ?

    Pertinence : Elle met en valeur les termes importants sans tenir compte de la longueur des documents.
