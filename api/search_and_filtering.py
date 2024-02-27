from flask import Flask, request, jsonify

app = Flask(__name__)

# Exemple de données de livres
livres = [
    {
        'titre': 'Livre 1',
        'auteur': 'Auteur 1',
        'genre': 'Science-fiction'
    },
    {
        'titre': 'Livre 2',
        'auteur': 'Auteur 2',
        'genre': 'Romance'
    },
    {
        'titre': 'Livre 3',
        'auteur': 'Auteur 3',
        'genre': 'Thriller'
    }
]

@app.route('/livres', methods=['GET'])
def get_livres():
    # Récupérer les paramètres de recherche et de filtre
    titre = request.args.get('titre')
    auteur = request.args.get('auteur')
    genre = request.args.get('genre')

    # Filtrer les livres en fonction des paramètres
    resultats = []
    for livre in livres:
        if (not titre or livre['titre'].lower().find(titre.lower()) != -1) and \
           (not auteur or livre['auteur'].lower().find(auteur.lower()) != -1) and \
           (not genre or livre['genre'].lower().find(genre.lower()) != -1):
            resultats.append(livre)

    return jsonify(resultats)

if __name__ == '__main__':
    app.run()