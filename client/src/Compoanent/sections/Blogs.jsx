import React from 'react';

export default function Blogs() {
  const articles = [
    {
      title: 'Les bienfaits de la téléconsultation',
      summary: 'Découvrez comment la téléconsultation améliore l’accès aux soins, surtout en zones rurales.',
      image: 'https://images.pexels.com/photos/7578801/pexels-photo-7578801.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Préparer votre rendez-vous médical',
      summary: 'Des conseils pratiques pour tirer le meilleur de vos consultations avec un professionnel.',
      image: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'L’importance des avis patients',
      summary: 'Pourquoi les avis sont essentiels pour choisir un spécialiste et améliorer les services.',
      image: 'https://images.pexels.com/photos/8460151/pexels-photo-8460151.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  return (
    <section id="blogs" className="bg-sky-50  px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-sky-900">Nos Articles Récents</h2>
        <p className="text-gray-600 mt-2">Restez informé sur la santé et le bien-être avec nos derniers blogs.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {articles.map((article, index) => (
          <div key={index} className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
            <img src={article.image} alt={article.title} className="w-full h-56 object-cover" />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold text-sky-800">{article.title}</h3>
              <p className="text-gray-700 text-sm">{article.summary}</p>
              <button className="mt-2 text-sm font-semibold text-sky-700 hover:underline">Lire plus</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
