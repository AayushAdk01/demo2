import prisma from "../lib/prisma";

async function main() {
  await prisma.milestone.createMany({
    data: [
      {
        Milestone_Title: "First Steps",
        Milestone_description: "Complete your first quiz",
        UnlockingLevel: 1,
        Milestone_reward_message: "You've earned your first reward!",
        Milestone_Link: "/rewards/first",
        Milestone_Button_CTA: "Claim Reward"
      },
      {
        Milestone_Title: "Quiz Explorer",
        Milestone_description: "Complete 5 quizzes",
        UnlockingLevel: 5,
        Milestone_reward_message: "Keep exploring!",
        Milestone_Link: "/rewards/explorer",
        Milestone_Button_CTA: "Get Reward"
      },
      // Add more milestones as needed
    ]
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });