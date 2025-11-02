import SceneClient from './scene-client';

export default function Page() {
  const data = {
    sceneNumber: 1,
    scriptSentence: 'King James VI survived a murder plot? but what if he planned it himself?',
    prompt:
      'King James VI stands alone beneath storm clouds near Gowrie House, wearing ornate 1600s royal attire with a jeweled crown. Mist swirls at his feet, dramatic light on half his face, thoughtful and suspicious expression, cinematic close-up.'
  } as const;

  return <SceneClient {...data} />;
}
