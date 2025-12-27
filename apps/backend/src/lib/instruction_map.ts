const instructionMap = new Map<string, string>([
  [
    "scenario",
    `You will be given a personal story or experience.
        Identify any abusive, manipulative, or emotionally harmful behavior — both done to the person and by the person.
        Explain why those actions or words are harmful and how the situation could have been handled in a healthier way.
        Focus on tone, respect, and emotional impact, not just explicit language.`
  ],
  [
    "conversation",
    `You will be given a conversation between two or more people.
        Identify any statements that are abusive, toxic, manipulative, or emotionally hurtful — regardless of who said them.
        Explain briefly why they are harmful and suggest healthier ways the same points could have been expressed.`
  ],
  [
    "document",
    `You will be given a written document.
        Identify parts that contain abusive, manipulative, hateful, or mentally triggering content.
        Explain why each part can negatively affect a reader and suggest how the content could be rewritten or prefaced with a warning.`
  ],
  [
    "video",
    `You will be given a video.
    Identify any visual, verbal, or situational content that is abusive, manipulative, emotionally harmful, or toxic — regardless of who is involved.
    Explain why those elements are harmful, whether through body language, tone, or specific actions, and suggest how the content could be restructured or presented in a more positive, respectful way.
    Focus on the emotional impact of both visuals and language, considering both implicit and explicit cues.`
  ]
]);

export default instructionMap;